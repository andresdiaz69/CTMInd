# Table: PresupuestoManoObras

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkEmpresas | smallint | NO |
| PkFkCentros | smallint | NO |
| PkFkAñoPresupuesto | nvarchar | NO |
| PkFkSeries | nvarchar | NO |
| PkFkNumPresupuesto | int | NO |
| PkFkManoObraGrupos | nvarchar | NO |
| PkPresupuestoManoObras_Iden | smallint | NO |
| Descripcion | nvarchar | NO |
| FkVariante | nvarchar | YES |
| UT | int | NO |
| PorcDescuento | decimal | NO |
| PrecioHora | decimal | NO |
| FkManoObraTipos | smallint | YES |
| FkManoObraCodigos | nvarchar | YES |
| FechaBaja | datetime | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
| PrecioCoste | decimal | YES |
| OperacionPrincipal | bit | NO |
| PrecioCI | decimal | YES |
| PrecioCosteCI | decimal | YES |
| PrecioDtoCliente | decimal | YES |
| PrecioGarantia | decimal | YES |
| FkTarifaTaller | nvarchar | YES |
| IdentificacionAplicacionExterna | nvarchar | YES |
| FkMonedas | smallint | YES |
| FactorCambioMoneda | decimal | YES |
| FkMarcas_Kit | smallint | YES |
| TallerKits | nvarchar | YES |
