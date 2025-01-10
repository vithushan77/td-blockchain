import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, IntColumn as IntColumn_} from "@subsquid/typeorm-store"

@Entity_()
export class Metrics {
    constructor(props?: Partial<Metrics>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @IntColumn_({nullable: false})
    totalTransfers!: number

    @IntColumn_({nullable: false})
    uniqueHolders!: number
}
