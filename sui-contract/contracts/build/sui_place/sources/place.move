address sui_place {
    module place {

        use sui::transfer;
        use sui::object;
        use sui::tx_context;

        // Struct to hold donation details
        struct Donation has key, store {
            id: sui::object::UID,
            donor: address,
            amount: u64,
            timestamp: u64,
        }

        // Function to log a donation
        public entry fun log_donation(donor: address, amount: u64, timestamp: u64, ctx: &mut tx_context::TxContext) {
            let donation = Donation { id: object::new(ctx), donor, amount, timestamp };
            transfer::public_transfer(donation, donor);
        }
    }
}
