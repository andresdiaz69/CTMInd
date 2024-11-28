# Table: publickeycontainer

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| alias | varchar | NO |
| subject | varchar | YES |
| issuer | varchar | YES |
| key_type | int | YES |
| not_before | datetime2 | YES |
| not_after | datetime2 | YES |
| fingerprint | varchar | YES |
| certificate_base64 | text | YES |
| id | int | NO |
| hmac | varchar | YES |
