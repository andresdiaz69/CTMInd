# Table: AspNetUsers

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| Id | nvarchar | NO |
| Email | nvarchar | YES |
| EmailConfirmed | bit | NO |
| PasswordHash | nvarchar | YES |
| SecurityStamp | nvarchar | YES |
| PhoneNumber | nvarchar | YES |
| PhoneNumberConfirmed | bit | NO |
| TwoFactorEnabled | bit | NO |
| LockoutEndDateUtc | datetime | YES |
| LockoutEnabled | bit | NO |
| AccessFailedCount | int | NO |
| UserName | nvarchar | NO |
