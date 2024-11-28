# Table: OAuth2User

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkOAuth2User_Iden | int | NO |
| FkOAuth2Client | smallint | NO |
| State | nvarchar | YES |
| Code | nvarchar | YES |
| CodeVerifier | nvarchar | YES |
| CodeChallenge | nvarchar | YES |
| AccesToken | nvarchar | YES |
| TokenRefresh | nvarchar | YES |
| ExpiresIn | smallint | YES |
| IdToken | nvarchar | YES |
| LoginHint | nvarchar | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
| FechaToken | datetime | YES |
