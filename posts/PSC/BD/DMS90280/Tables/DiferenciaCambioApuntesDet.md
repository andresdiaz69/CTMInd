# Table: DiferenciaCambioApuntesDet

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkEmpresas | smallint | NO |
| PkFkAñoAsiento_Factura | nvarchar | NO |
| PkFkAsientos_factura | int | NO |
| PkFkContCtas_ProvisoriaApunte | nvarchar | NO |
| PkFkDiferenciaCambioApuntes_FechaApunte | datetime | NO |
| PkFkEfectosNumDet_Saldado | smallint | NO |
| FechaSaldado | datetime | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
| ImporteSaldadoMI | decimal | YES |
| ImporteSaldadoMC | decimal | YES |
| ImporteSaldadoMO | decimal | YES |
| ImporteDiferenciaCambioMI | decimal | YES |
| ImporteDiferenciaCambioMC | decimal | YES |
| ImporteProvisionMI | decimal | YES |
| ImporteProvisionMC | decimal | YES |
| ImporteProvisionConversionMC | decimal | YES |
| ImporteConversionMC | decimal | YES |
| FkAñoAsiento_DiferencialSaldado | nvarchar | YES |
| FkAsientos_DiferencialSaldado | int | YES |
| EsPolizaVN | bit | YES |
| CierreRealizado | bit | YES |
| SaldadoRealizado | bit | YES |
