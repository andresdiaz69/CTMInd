# Table: AsientoTicketBai

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkEmpresas | smallint | NO |
| PkFkAñoAsiento | nvarchar | NO |
| PkFkAsientos | int | NO |
| FkAsientoTicketBaiEstados | tinyint | NO |
| SerieFactura | nvarchar | YES |
| NumFactura | nvarchar | YES |
| AñoFactura | nvarchar | YES |
| Signature | nvarchar | YES |
| FechaExpedicion | datetime | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
| FechaEnvio | datetime | NO |
| CSV | nvarchar | YES |
| XMLEnvio | nvarchar | YES |
| XMLRespuesta | nvarchar | YES |
