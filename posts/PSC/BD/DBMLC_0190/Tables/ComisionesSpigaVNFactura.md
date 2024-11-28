# Table: ComisionesSpigaVNFactura

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
| CodigoEmpresaSugerido | int | NO |
| EmpresaSugerida | nvarchar | NO |
| CodigoCentro | smallint | NO |
| Centro | nvarchar | NO |
| FechaFactura | datetime2 | NO |
| NumeroFactura | nvarchar | NO |
| Nitcliente | nvarchar | YES |
| NombreCliente | nvarchar | YES |
| CodigoCategoriaCliente | smallint | YES |
| CategoriaCliente | nvarchar | YES |
| TotalFactura | decimal | NO |
| Matricula | nvarchar | YES |
| VIN | nvarchar | YES |
| ImporteEfecto | decimal | YES |
| PkEfectosNumDet_Iden | smallint | YES |
| fksituacionefectos | tinyint | YES |
| descripcion | nvarchar | YES |
| FechaSaldado | datetime2 | YES |
| CuotaReteFuente | decimal | YES |
| EntregaInmediata | bit | NO |
| FechaSaldado_Ajustado | datetime2 | YES |
| FechaAlta | datetime2 | YES |
