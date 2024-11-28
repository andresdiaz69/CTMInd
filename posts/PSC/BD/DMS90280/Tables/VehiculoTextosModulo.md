# Table: VehiculoTextosModulo

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkVehiculos | int | NO |
| PkFkModulos | nvarchar | NO |
| PkFkTextoTipo | nvarchar | NO |
| PkVehiculoTextosModulo_Iden | smallint | NO |
| DocumentoExencionNumero | nvarchar | YES |
| DocumentoExencionEmisor | nvarchar | YES |
| DocumentoExencionFechaEmision | datetime | YES |
| DocumentoExencionImporte | decimal | YES |
| DocumentoExencionPorcentaje | decimal | YES |
| DocumentoExencionFechaValidezDesde | datetime | YES |
| DocumentoExencionFechaValidezHasta | datetime | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
