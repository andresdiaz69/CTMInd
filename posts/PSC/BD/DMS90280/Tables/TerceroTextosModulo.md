# Table: TerceroTextosModulo

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkTerceros | int | NO |
| PkFkModulos | nvarchar | NO |
| PkFkTextoTipo | nvarchar | NO |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
| PkTerceroTextosModulo_Iden | smallint | NO |
| DocumentoExencionNumero | nvarchar | YES |
| DocumentoExencionEmisor | nvarchar | YES |
| DocumentoExencionFechaEmision | datetime | YES |
| DocumentoExencionImporte | decimal | YES |
| DocumentoExencionPorcentaje | decimal | YES |
| DocumentoExencionFechaValidezDesde | datetime | YES |
| DocumentoExencionFechaValidezHasta | datetime | YES |
