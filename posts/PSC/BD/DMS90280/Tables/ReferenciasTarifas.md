# Table: ReferenciasTarifas

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
| UnidadesPorMenor | decimal | YES |
| UndEnvaseCompra | decimal | NO |
| UndEnvaseVenta | decimal | NO |
| PrecioCompra | decimal | NO |
| PrecioVenta | decimal | NO |
| Calificada | bit | NO |
| ImporteGastos | decimal | NO |
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
| FactorCambioMoneda | decimal | YES |
| NaturalRestitution | bit | NO |
| FkCodigosTarifas | nvarchar | YES |
| PrecioExAduana | decimal | YES |
| EsMaterialPeligroso | bit | NO |
| NoIncluirEnPedidosMarca | bit | NO |
