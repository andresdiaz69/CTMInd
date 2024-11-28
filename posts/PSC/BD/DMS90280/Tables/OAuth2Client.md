# Table: OAuth2Client

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkOAuth2Client_Iden | smallint | NO |
| Nombre | nvarchar | NO |
| Descripcion | nvarchar | NO |
| ClientID | nvarchar | YES |
| UseClientSecret | bit | YES |
| ClientSecret | nvarchar | YES |
| Scope | nvarchar | YES |
| UrlAuth | nvarchar | YES |
| UrlToken | nvarchar | YES |
| UsePCKE | bit | YES |
| CodeChallengeMethod | nvarchar | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
