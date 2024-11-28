# Table: PazSalvoEntrega

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkEmpresas | smallint | NO |
| PkAñoPazSalvoEntrega | nvarchar | NO |
| PkFkSeries_PazSalvoEntrega | nvarchar | NO |
| PkNumPazSalvoEntrega | int | NO |
| FkCentros_VN | smallint | YES |
| FkAñoExpediente_VN | nvarchar | YES |
| FkSeries_Expediente_VN | nvarchar | YES |
| FkNumExpediente_VN | int | YES |
| FkVentas_VN | smallint | YES |
| FkCentros_VO | smallint | YES |
| FkAñoExpediente_VO | nvarchar | YES |
| FkSeries_Expediente_VO | nvarchar | YES |
| FkNumExpediente_VO | int | YES |
| FkVentas_VO | smallint | YES |
| FechaAlta | datetime | NO |
| Observaciones | nvarchar | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
| FechaBaja | datetime | YES |
| FkEmpleados_EmitePSE | smallint | YES |
