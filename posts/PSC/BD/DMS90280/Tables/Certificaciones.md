# Table: Certificaciones

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkCertificaciones | nvarchar | NO |
| Descripcion | nvarchar | NO |
| FechaInicioVigencia | datetime | NO |
| FechaFinVigencia | datetime | NO |
| PeriodoAlerta | tinyint | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
| FkTerceros_Proveedor | int | YES |
| ImporteCupo | decimal | YES |
| UnidadesCupo | decimal | YES |
| FKMonedas_Cupo | smallint | YES |
| ImporteCupoPendiente | decimal | YES |
| UnidadesCupoPendiente | decimal | YES |
| ImporteUnitarioCupo | decimal | YES |
| FechaBaja | datetime | YES |
