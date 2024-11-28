# Table: PeticionesCarga

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkPeticionesCarga_Iden | int | NO |
| FkEmpresas | smallint | NO |
| FkCentros | smallint | NO |
| FkAñoOT | nvarchar | YES |
| FkSeries_OT | nvarchar | YES |
| FkNumOT | int | YES |
| FkNumTrabajo | tinyint | YES |
| FkPuntosCarga | smallint | NO |
| FkVehiculos | int | YES |
| FkTerceros | int | NO |
| Observaciones | nvarchar | YES |
| FkPeticionCargaEstados | smallint | NO |
| Coste | decimal | YES |
| Facturado | bit | NO |
| Descartado | bit | NO |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
| FechaAlta | datetime | NO |
| HoraInicio | datetime | YES |
| HoraFin | datetime | YES |
| FkSeries_Factura | nvarchar | YES |
| FkNumFactura | nvarchar | YES |
| FkAñoFactura | nvarchar | YES |
| Consumo | decimal | YES |
| PrecioVenta | decimal | YES |
