# Table: ComisionesSpigaAlmacenFactura

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| Id | uniqueidentifier | NO |
| IdComisionSpiga | int | NO |
| Ano_Periodo | int | NO |
| Mes_Periodo | int | NO |
| Ano_Spiga | int | YES |
| Mes_Spiga | int | YES |
| CodigoEmpresa | smallint | NO |
| Empresa | nvarchar | NO |
| CodigoCentro | smallint | NO |
| Centro | nvarchar | NO |
| FechaFactura | datetime2 | NO |
| NumeroFactura | nvarchar | YES |
| TipoMov | nvarchar | NO |
| Nitcliente | nvarchar | YES |
| NombreCliente | nvarchar | YES |
| CodigoCategoriaCliente | smallint | YES |
| CategoriaCliente | nvarchar | YES |
| TotalBI | decimal | NO |
| TotalTasas | decimal | NO |
| TotalCuotaIVA | decimal | NO |
| Portes | decimal | NO |
| Embalajes | decimal | NO |
| TotalFactura | decimal | NO |
| VentaCampaña | int | YES |
| ImporteEfecto | decimal | YES |
| PkEfectosNumDet_Iden | smallint | YES |
| fksituacionefectos | tinyint | YES |
| descripcion | nvarchar | YES |
| FechaSaldado | datetime2 | YES |
| FkSecciones | int | YES |
| Seccion | nvarchar | YES |
