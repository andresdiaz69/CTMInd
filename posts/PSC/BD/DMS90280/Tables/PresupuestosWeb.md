# Table: PresupuestosWeb

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkPresupuestosWeb_Iden | int | NO |
| FkEmpresas | smallint | NO |
| FkCentros | smallint | NO |
| FkEmpleados_Alta | smallint | NO |
| FechaAlta | datetime | NO |
| FkTerceros_Cliente | int | NO |
| EmailCliente | nvarchar | YES |
| TelefonoMovilCliente | nvarchar | YES |
| EmailContacto | nvarchar | YES |
| TelefonoContacto | nvarchar | YES |
| Descripcion | nvarchar | YES |
| CodigoExterno | nvarchar | YES |
| UrlAcceso | nvarchar | YES |
| UrlAccesoCorta | nvarchar | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
| NombreContacto | nvarchar | YES |
| FkPresupuestosWebTipos | tinyint | NO |
