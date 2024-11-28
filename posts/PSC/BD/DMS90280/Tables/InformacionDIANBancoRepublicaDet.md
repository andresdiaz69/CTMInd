# Table: InformacionDIANBancoRepublicaDet

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkEmpresas | smallint | NO |
| PkFkBancoRepublica | int | NO |
| PkBancoRepublicaDet_Iden | int | NO |
| NumeralIngreso | nvarchar | YES |
| ImporteIngreso | decimal | YES |
| NumeralEgreso | nvarchar | YES |
| ImporteEgreso | decimal | YES |
| FkAsientos | int | YES |
| FkAñoAsiento | nvarchar | YES |
| FechaAsiento | datetime | YES |
| NumAsiento | int | YES |
| ImporteAsiento | decimal | YES |
| FkTerceros | int | YES |
| NombreTercero | nvarchar | YES |
| NumDocumento | nvarchar | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
