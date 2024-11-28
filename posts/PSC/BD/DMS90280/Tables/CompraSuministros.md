# Table: CompraSuministros

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkEmpresas | smallint | NO |
| PkFkCentros | smallint | NO |
| PkAñoCSumAlbaran | nvarchar | NO |
| PkFkTerceros | int | NO |
| PkFkSeries_CSumAlbaran | nvarchar | NO |
| PkNumCSumAlbaran | nvarchar | NO |
| FkPagoFormas | nvarchar | NO |
| FechaAlbaran | datetime | NO |
| FechaAlta | datetime | NO |
| FkAsientos | int | YES |
| FkAñoAsiento | nvarchar | YES |
| FkEmpleados | smallint | NO |
| FechaBaja | datetime | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FkSeries_Factura | nvarchar | YES |
| FkNumFactura | nvarchar | YES |
| FkAñoFactura | nvarchar | YES |
| FechaMod | datetime | NO |
| FactorCambioMonedaContravalor | decimal | YES |
