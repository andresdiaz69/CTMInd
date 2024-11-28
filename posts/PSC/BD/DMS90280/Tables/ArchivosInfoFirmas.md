# Table: ArchivosInfoFirmas

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkArchivos | int | NO |
| FkBiofirmaSistemas | smallint | NO |
| FkEmpresas | smallint | NO |
| FkCentros | smallint | NO |
| FkSecciones | int | YES |
| FkEmpleados | smallint | YES |
| NumFirmasDocumento | tinyint | NO |
| NumFirmasConSellado | tinyint | NO |
| NumFirmasCliente | tinyint | NO |
| EmailClientesNotificados | nvarchar | YES |
| EmailEmpleadosNotificados | nvarchar | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
| FkTerceros_Cliente | int | YES |
| ClaveDocumento | nvarchar | YES |
| NombreDocumento | nvarchar | YES |
| DescripcionDocumento | nvarchar | YES |
| FkUsuarios | smallint | YES |
| DatosFirmas | nvarchar | YES |
| DatosFirmasHash | nvarchar | YES |
