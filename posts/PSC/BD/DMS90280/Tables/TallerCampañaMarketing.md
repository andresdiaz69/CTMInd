# Table: TallerCampañaMarketing

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkTallerCampañaMarketing_Iden | int | NO |
| CodigoCampaña | nvarchar | NO |
| Descripcion | nvarchar | NO |
| ImprimirEnFactura | bit | NO |
| Acumulable | bit | NO |
| NumMaxVehiculos | smallint | YES |
| CampañasPorVehiculos | smallint | YES |
| FkTallerCampañaMarketingCanal | nvarchar | YES |
| ImporteMinimo | decimal | YES |
| FechaValidezDesde | datetime | YES |
| FechaValidezHasta | datetime | YES |
| AntiguedadDesde | smallint | YES |
| AntiguedadHasta | smallint | YES |
| FechaBaja | datetime | YES |
| FkTerceroClases | tinyint | YES |
| FkMarcas | smallint | YES |
| AplicaManoObra | bit | NO |
| AplicaMaterial | bit | NO |
| AplicaSubcontratados | bit | NO |
| AplicaVarios | bit | NO |
| AplicaPintura | bit | NO |
| DescuentoAdicional | bit | NO |
| PrecioCerrado | decimal | YES |
| PorcDescuento | decimal | YES |
| ImporteDescuento | decimal | YES |
| RegaloDescripcion | nvarchar | YES |
| RegaloImporte | decimal | YES |
| FkMR_Regalo | nvarchar | YES |
| FkReferencias_Regalo | nvarchar | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
