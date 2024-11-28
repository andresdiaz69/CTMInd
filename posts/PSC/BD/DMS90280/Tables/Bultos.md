# Table: Bultos

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkBultos | int | NO |
| FkEmpresas | smallint | NO |
| FkCentros | smallint | NO |
| FkSecciones | int | NO |
| Estado | tinyint | NO |
| FechaAlta | datetime | NO |
| FkEmpleados | smallint | NO |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
| HostEntrega | nvarchar | YES |
| FechaEntrega | datetime | YES |
| FkEmpleados_Entrega | smallint | YES |
| FkTerceros | int | YES |
| FkSecciones_Taller | int | YES |
| FkTerceroDirecciones_Envio | smallint | YES |
| FkSecciones_Destino | int | YES |
| FkRutasRecogida | int | YES |
