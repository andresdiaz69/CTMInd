# Table: CompraSuministrosDet

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkEmpresas | smallint | NO |
| PkFkCentros | smallint | NO |
| PkFkAñoCSumAlbaran | nvarchar | NO |
| PkFkTerceros | int | NO |
| PkFkSeries_CSumAlbaran | nvarchar | NO |
| PkFkNumCSumAlbaran | nvarchar | NO |
| PkCSumDet_Iden | smallint | NO |
| FkCompraSuministroTipos | smallint | NO |
| Unidades | decimal | NO |
| PrecioCompra | decimal | NO |
| PorcDescuentoCompra | decimal | NO |
| FkImpuestos_Compra | nvarchar | NO |
| FkImpuestoTipos_Compra | nvarchar | NO |
| ImpuestoPorcCompra | decimal | YES |
| ImpuestoImporteCompra | decimal | YES |
| FechaAlta | datetime | NO |
| FechaBaja | datetime | YES |
| FkSecciones | int | NO |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
