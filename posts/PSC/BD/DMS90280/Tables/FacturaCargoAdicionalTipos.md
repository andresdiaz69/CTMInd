# Table: FacturaCargoAdicionalTipos

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkEmpresas | smallint | NO |
| PkFacturaCargoAdicionalTipos_Iden | tinyint | NO |
| Descripcion | nvarchar | NO |
| FkFacturaAdicionalAmbitos | nvarchar | NO |
| FkFacturaAdicionalCargoTipos | nvarchar | YES |
| FkTerceros | int | YES |
| AfectaRentabilidad | bit | NO |
| CargoUnico | bit | NO |
| FacturaDeCargo | bit | NO |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
| Precarga | bit | NO |
| FechaBaja | datetime | YES |
| AutoFactura | bit | NO |
