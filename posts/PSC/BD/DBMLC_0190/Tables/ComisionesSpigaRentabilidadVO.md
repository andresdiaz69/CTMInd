# Table: ComisionesSpigaRentabilidadVO

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| Id | int | NO |
| IdComisionSpiga | int | NO |
| Ano_Periodo | int | NO |
| Mes_Periodo | int | NO |
| CodigoEmpresa | smallint | NO |
| Empresa | nvarchar | NO |
| CodigoCentro | smallint | NO |
| NombreCentro | nvarchar | NO |
| CodigoSeccion | int | NO |
| NombreSeccion | nvarchar | NO |
| TipoCompra | nvarchar | NO |
| TipoVenta | nvarchar | NO |
| ValorDepreciaciones | decimal | NO |
| Placa | nvarchar | YES |
| Expediente | nvarchar | YES |
| Marca | nvarchar | NO |
| Gama | nvarchar | NO |
| FechaCompra | datetime2 | NO |
| FacturaCompra | nvarchar | YES |
| ValorCompra | decimal | NO |
| GastosIS | decimal | NO |
| CargosAdicionales | decimal | NO |
| FechaEntregaCliente | datetime2 | YES |
| FechaVenta | datetime2 | NO |
| FacturaVenta | nvarchar | NO |
| DiasStock | int | YES |
| ValorVenta | decimal | NO |
| Utilidad | decimal | YES |
| UtilidadVenta | decimal | YES |
| ProvisionGastos | decimal | NO |
| ProvisionGastosNIS | decimal | NO |
