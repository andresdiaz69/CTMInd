# Table: _LaFloresta_Mig_ReferenciasTarifas

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkMR | nvarchar | NO |
| PkFkTarifas | tinyint | NO |
| PkFkReferencias | nvarchar | NO |
| FkClasificacion1 | nvarchar | NO |
| FkClasificacion2 | nvarchar | YES |
| FkClasificacion3 | nvarchar | YES |
| FkClasificacion4 | nvarchar | YES |
| FkClasificacion5 | nvarchar | YES |
| FkClasificacion6 | nvarchar | YES |
| FkReferencias_PorMenor | nvarchar | YES |
| UnidadesPorMenor | numeric | YES |
| UndEnvaseCompra | numeric | NO |
| UndEnvaseVenta | numeric | NO |
| PrecioCompra | numeric | NO |
| PrecioVenta | numeric | NO |
| PrecioGarantia | numeric | NO |
| Calificada | bit | NO |
| ImporteGastos | numeric | NO |
| FkDescuentos | nvarchar | NO |
| Observaciones | nvarchar | YES |
| CodigoBarras | nvarchar | YES |
| AutorizarGarantia | bit | NO |
| PiezaCanje | bit | NO |
| NoPedirNormal | bit | NO |
| NoPedirUrgente | bit | NO |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
| CreadaEnTarifa | bit | NO |
| FkMonedas | smallint | YES |
| FactorCambioMoneda | numeric | YES |
| NaturalRestitution | bit | NO |
| FkCodigosTarifas | nvarchar | YES |
| PrecioExAduana | numeric | YES |
| EsMaterialPeligroso | bit | NO |
