module.exports = {
    firebaseConfig: {
        apiKey: process.env.API_KEY,
        authDomain: process.env.AUTH_DOMAIN,
        projectId: process.env.PROJECT_ID,
        storageBucket: process.env.STORAGE_BUCKET,
        messagingSenderId: process.env.MESSAGING_SENDER_ID,
        appId: process.env.APP_ID,
        measurementId: process.env.MEASUREMENTID
    }, firebaseAdminConfig: {
        type: process.env.TYPE,
        project_id: process.env.PROJECT_ID,
        private_key_id: process.env.PRIVATE_KEY_ID,
        private_key: process.env.PRIVATE_KEY,
        client_email: process.env.CLIENT_EMAIL,
        client_id: process.env.CLIENT_ID,
        auth_uri: process.env.AUTH_URI,
        token_uri: process.env.TOKEN_URI,
        auth_provider_x509_cert_url: process.env.AUTH_PROVIDER_X509_CERT_URL,
        client_x509_cert_url: process.env.CLIENT_X509_CERT_URL,
        universe_domain: process.env.UNIVERSE_DOMAIN
    }
    // firebaseAdminConfig: {
    //     type: "service_account",
    //     project_id: "rakshak-dev",
    //     private_key_id: "b0a7892dd008ce17a6f42b413f266833d1f0c82c",
    //     private_key: "Rakshak-app\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCpTu02aBQ8PP5y\n1zzr+HOdMFbXREHoviaa5o8md0CZzk1uKARq44r0k5IwYsM8aMwD1ORUvChOW2KV\nzYHAXeBtxDTUuXU9noEtLhm/1MaYQBV6Y7JaQbnwRR4RzP0kbGGyfamfrvKpctLq\nDKYZBDZyAsptJ28z8urbFUIH7h6zF2kac7sghZkSLqUNSRakqvXmi8VS/V17ldFZ\nukcbcKYYOLmpsvgTpH91je/l6WDqvwATMlGJecHFXm6gt/y4Elgy2y7vbxNUeKUa\nK7Dbag9cq50wCEA5yyXLcoRzAmkKRZ1JVn1n4plhL1T//otRDEGFfkQalx4zgSNI\nsNfKDRPFAgMBAAECggEAG810Mr0Apau2dRFXVcCk66kmeY8h66BeIo298CkhGKDC\nIla78vmOtf8NwJhXSzJCXla1cBy92bA0DjmDFx3TXvMbYdtan1XKDKtHWzMLsbDE\nVibNAPlOGWCgQXgSEcsid/cexbQq8RyD+h89n1oLvskqiKYzIqq/Wl6xSzAVJn9r\nOBUqPTtEGm4FmWipxT/y9p7r4dqf1TVWoYvPtBRkX3fRnjzqmle1GYpBlJ/MemOC\n+VgKDOL5rk6hAed06ySfvJg8h8n28bp4q9gMIMZQJa6iWVNbzXegq0zvVt28t/Zy\nUwnZSekjMqFKOfIsAHGts/DC2onyMThjB8TrVJ8POQKBgQDZf6F9E9lulwiTC/D7\ncYKkshoPSXlcVZf6RN7OEawL/hVl+UPShmReBmKwlzWvqih8vabM67Jb1xQm/X8H\n4q9/8h3qVupa+R1UFcxHrtreQMqaW2Wq77lWTdPlIuaOkgFjyNpaGCajPJoXE9Td\npdJLT9sS+CNo+WuvcK+9XpE0EwKBgQDHR3YI5iYRgvKwWQSt+FyYypfOeOBOmqoo\n78k40JSu8XT8rGzX1QiTlYeQNhKsTNCd9KiZw9ymjfGd4MXy0jWgtEBnqGWKjLSn\nBlqPElXLcREbwsEBEv3TatZFBUutCwHNqX2Cg6z/I9uVqyqJNj9hvNWB1o0YcK+W\nwoydKpUjxwKBgGjeOA/ltS20VucHl+60oUgls5jxVTmm73s1H7R+ItU5cjnTwNbO\nA7CuJYF9tt33DkRu8PDXKA1OG6JdEZXMv8/R/oiR1bd9a52yUOezMEZ/OPDJ5rBP\nm644IlXVyRKu5Uqmell8UYzdWHKOFlG0dTvoyflQeUpREJHrpGCLKznPAoGAYI7M\nr5UsvvFvPGl1rgIYg+QuWFoTfaLNblZ5brEKShYu9Dtr5cyQgkpCzGqW86uordCd\nXRwdLwq6FyCRaY3XdE3CozdiNBbndcLLYGWm8pOPkZ71O9sC6EztE7Z0K52Yuxkz\n+mhpC5tJS6ULUD7byTThUy8tYLlBK1CLJ6A5cYMCgYEAuEkJKWa4W7KRs8vXiogW\nG7nSrGou48GbylLEcEojkhovF16ozW+tshKbyOkr+aYSBReeTzCYXq5aKG9z8x6I\nZisESYuwjUlQ9x2ClObh9jxCyDSyO1Jtf5Jp6GykNwlO3VX1N4OENKDUjRSpMx8I\nGX2pFpmT62pUYQsEGrqoTsA=\nRakshak-app\n",
    //     client_email: "firebase-adminsdk-qz9ur@rakshak-dev.iam.gserviceaccount.com",
    //     client_id: "116962847076962614665",
    //     auth_uri: "https://accounts.google.com/o/oauth2/auth",
    //     token_uri: "https://oauth2.googleapis.com/token",
    //     auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
    //     client_x509_cert_url: "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-qz9ur%40rakshak-dev.iam.gserviceaccount.com",
    //     universe_domain: "googleapis.com"
    // }
}