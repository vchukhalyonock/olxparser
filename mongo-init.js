db.createUser(
    {
        user: "olxparser",
        pwd: "olxparser",
        roles: [
            {
                role: "readWrite",
                db: "olxparser"
            }
        ]
    }
)
