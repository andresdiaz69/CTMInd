# Table: spiga_HojasDeGastosEmpleados

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| IdSincronizacionSpiga | int | NO |
| IdConsecutivo | int | NO |
| Ano_Periodo | int | NO |
| Mes_Periodo | int | NO |
| FechaDeCorte | datetime | NO |
| CodEmpresa | smallint | YES |
| Empresa | nvarchar | YES |
| CodCentro | smallint | YES |
| Centro | nvarchar | YES |
| CodEmpleado | smallint | YES |
| Empleado | nvarchar | YES |
| CodConcepto | nvarchar | YES |
| Concepto | nvarchar | YES |
| Importe | decimal | YES |
| FacturaVinculada | nvarchar | YES |
| CodTerceroFactura | nvarchar | YES |
| TerceroFactura | nvarchar | YES |
| FechaGasto | nvarchar | YES |
| estado | nvarchar | YES |
| AnticipoVinculado | nvarchar | YES |
| IdHojasGasto | smallint | YES |
| ImporteAnticipoVinculado | decimal | YES |
