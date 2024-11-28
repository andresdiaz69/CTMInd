# Table: ResContable

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| pkfkempresas | smallint | NO |
| FkContCtas | nvarchar | NO |
| FechaAsiento | datetime | NO |
| guia | int | NO |
| FkCentros | smallint | NO |
| FkDepartamentos | nvarchar | YES |
| FkSecciones | int | YES |
| FkMarcas | smallint | YES |
| FkGamas | smallint | YES |
| FkMR | nvarchar | YES |
| FkClasificacion1 | nvarchar | YES |
| FkCentros_Aux | smallint | YES |
| FkDepartamentos_Aux | nvarchar | YES |
| FkSecciones_Aux | int | YES |
| ImporteDebe | decimal | NO |
| ImporteHaber | decimal | NO |
| FactorCambioMonedaContravalor | decimal | YES |
| FkTerceros | int | YES |
| FkCtaBancarias | smallint | YES |
| FkVentaCanales | nvarchar | YES |
| FkCompraCanales | nvarchar | YES |
| FkManoObraTipos | smallint | YES |
| FkTerceros_Asientos | int | YES |
| FkTercerosClases | tinyint | YES |
| FkAsientoTipos | nvarchar | YES |
| FkEntidades | nvarchar | YES |
