# Table: CompraGastoAdicionalTipos

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkEmpresas | smallint | NO |
| PkCompraGastoAdicionalTipos | nvarchar | NO |
| Descripcion | nvarchar | NO |
| IncrementaStock | bit | NO |
| AfectaRentabilidad | bit | NO |
| SobreCosteVO | bit | NO |
| FechaAlta | datetime | NO |
| FechaBaja | datetime | YES |
| Precarga | bit | NO |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
| FkCompraGastoAdicionalTipos_VehiculosFacturados | nvarchar | YES |
| FkVehiculoEstados | smallint | NO |
| FkCompraGastoAdicionalTiposClasificacion | tinyint | NO |
| Importacion | bit | NO |
| AnticipadoImportacion | bit | NO |
| Preparacion | bit | NO |
| Aranceles | bit | NO |
| ContabilizaAlbaran | bit | NO |
| ContabilizaMedianteDUA | bit | NO |
