import { EvmBatchProcessor } from "@subsquid/evm-processor";
import { TypeormDatabase } from "@subsquid/typeorm-store";
import * as usdtAbi from "./abi/usdt";
import { Token, Transfer, Balance, Metrics } from "./model";

const address = "0xdAC17F958D2ee523a2206206994597C13D831ec7";
const processor = new EvmBatchProcessor()
  .setGateway("https://v2.archive.subsquid.io/network/ethereum-mainnet")
  .setRpcEndpoint({
    url: process.env.RPC_ETH_HTTP,
    rateLimit: 10,
  })
  .setFinalityConfirmation(75) // 15 mins to finality
  .addLog({
    address: [address],
    topic0: [usdtAbi.events.Transfer.topic],
  });

const db = new TypeormDatabase();

processor.run(db, async (ctx) => {
  if (ctx.blocks.length === 0) return;

  const transfers: Transfer[] = [];
  const balances: Map<string, bigint> = new Map();
  const holders = new Set<string>();

  const contract = new usdtAbi.Contract(ctx, ctx.blocks[0].header, address);
  await ctx.store.upsert(
    new Token({
      id: address,
      name: await contract.name(),
      symbol: await contract.symbol(),
      decimals: await contract.decimals(),
      totalSupply: await contract.totalSupply(),
    }),
  );

  for (let block of ctx.blocks) {
    for (let log of block.logs) {
      const { from, to, value } = usdtAbi.events.Transfer.decode(log);

      if (from !== "0x0000000000000000000000000000000000000000") {
        balances.set(from, (balances.get(from) || 0n) - value);
      }
      balances.set(to, (balances.get(to) || 0n) + value);

      if (from !== "0x0000000000000000000000000000000000000000") {
        holders.add(from);
      }
      holders.add(to);

      transfers.push(
        new Transfer({
          id: log.id,
          from,
          to,
          value,
        }),
      );
    }
  }

  const balanceEntities = Array.from(balances.entries()).map(
    ([address, balance]) => {
      return new Balance({
        id: address,
        tokenId: address,
        balance,
      });
    },
  );
  await ctx.store.upsert(balanceEntities);

  // TODO: add a global metrics id that stores every metrics
  const metrics = new Metrics({
    id: `token:${address}`,
    totalTransfers: transfers.length,
    uniqueHolders: holders.size,
  });
  await ctx.store.upsert([metrics]);

  await ctx.store.insert(transfers);
});
