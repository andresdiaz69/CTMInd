# Table: ImputacionTipos

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkEmpresas | smallint | NO |
| PkImputacionTipos_Iden | smallint | NO |
| Descripcion | nvarchar | NO |
| FkImputacionTiposInternos | nvarchar | YES |
| FkAcondicionamientoTipos | smallint | YES |
| SeccionObligatoria | bit | NO |
| FechaBaja | datetime | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
| MargenVentaInterna | decimal | YES |
| FkImputacionTipos_VehiculosFacturados | smallint | YES |
| AfectaRentabilidad | bit | NO |
| FkTallerPagoTipos | nvarchar | YES |
| VentaPVP | bit | NO |
| EmiteFacturaRecambios | bit | NO |
