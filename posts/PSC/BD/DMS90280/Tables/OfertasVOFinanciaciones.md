# Table: OfertasVOFinanciaciones

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkEmpresas | smallint | NO |
| PkFkCentros | smallint | NO |
| PkFkTerceros | int | NO |
| PkFkClientesPotEntradas | smallint | NO |
| PkFkOfertasVO | smallint | NO |
| PkFkTerceros_Financiacion | int | NO |
| PkFkFinanciacionTablas | nvarchar | NO |
| PkFkMesesFT | smallint | NO |
| PkOfertasVOFinanciaciones_Iden | smallint | NO |
| FactorCalculoPorc | decimal | NO |
| InteresPorc | decimal | YES |
| ComisionApertura | decimal | YES |
| ComisionConcesionario | decimal | YES |
| Cuota | decimal | NO |
| ImporteFinanciado | decimal | NO |
| Activa | bit | NO |
| Fecha | datetime | NO |
| Descripcion | nvarchar | NO |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
| FkMonedas | smallint | YES |
| FactorCambioMoneda | decimal | YES |
