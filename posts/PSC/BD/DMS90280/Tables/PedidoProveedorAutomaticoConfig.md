# Table: PedidoProveedorAutomaticoConfig

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkEmpresas | smallint | NO |
| PkFkCentros | smallint | NO |
| PkFkMR | nvarchar | NO |
| FkSecciones | int | NO |
| FkTerceros | int | NO |
| FkEmpresas_Destino | smallint | YES |
| FkCentros_Destino | smallint | YES |
| FkSecciones_Destino | int | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
| FkEmpleados | smallint | NO |
