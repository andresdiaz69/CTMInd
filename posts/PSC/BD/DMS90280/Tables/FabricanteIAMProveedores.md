# Table: FabricanteIAMProveedores

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkFabricantes | smallint | NO |
| PkFkTerceros | int | NO |
| PkFabricanteIAMProveedores_Iden | smallint | NO |
| FkEmpresas | smallint | YES |
| FkCentros | smallint | YES |
| GSC | bit | NO |
| Orden | smallint | NO |
| CodigoFabricanteExterno | nvarchar | YES |
| FechaBaja | datetime | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
