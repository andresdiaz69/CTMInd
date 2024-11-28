# Table: TrabajoSubcontratados

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkEmpresas | smallint | NO |
| PkFkCentros | smallint | NO |
| PkAñoTSAlbaran | nvarchar | NO |
| PkFkTerceros | int | NO |
| PkSerieTSAlbaran | nvarchar | NO |
| PkNumTSAlbaran | nvarchar | NO |
| FkPagoFormas | nvarchar | NO |
| FechaAlbaran | datetime | NO |
| FechaAlta | datetime | NO |
| FkAsientos | int | YES |
| FkAñoAsiento | nvarchar | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FkAñoFactura | nvarchar | YES |
| FkSeries | nvarchar | YES |
| FkNumFactura | nvarchar | YES |
| FkEmpleados_Realiza | smallint | NO |
| FechaMod | datetime | NO |
| FactorCambioMonedaContravalor | decimal | YES |
