# Table: PasarelaPagoHost

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkEmpresas | smallint | NO |
| PkFkTpvs | smallint | NO |
| PkPasarelaPagoHost | nvarchar | NO |
| Puerto | nvarchar | YES |
| BaudRate | int | YES |
| RutaLocalDLL | nvarchar | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
| FechaInicioLlaves | datetime | YES |
| TimeOut1 | int | YES |
| TimeOut2 | int | YES |
| Ip | nvarchar | YES |
| ImprimirTicket | bit | YES |
