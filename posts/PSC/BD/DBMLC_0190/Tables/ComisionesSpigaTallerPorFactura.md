# Table: ComisionesSpigaTallerPorFactura

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
| NumeroFacturaTaller | nvarchar | NO |
| FechaFactura | datetime2 | YES |
| NitCliente | nvarchar | YES |
| NombreCliente | nvarchar | YES |
| CodigoCategoriaCliente | smallint | YES |
| CategoriaCliente | nvarchar | YES |
| ImporteMO | decimal | NO |
| ImporteMat | decimal | NO |
| ImporteExt | decimal | NO |
| ImporteVarios | decimal | NO |
| ImportePintura | decimal | NO |
| ImporteImpuesto | decimal | YES |
| ValorTotalFactura | decimal | YES |
| CampañaRepuesto | int | YES |
| ImporteEfecto | decimal | NO |
| PkEfectosNumDet_Iden | smallint | NO |
| fksituacionefectos | tinyint | NO |
| descripcion | nvarchar | YES |
| FechaSaldado | datetime2 | YES |
| FkSecciones | int | YES |
| Seccion | nvarchar | YES |
