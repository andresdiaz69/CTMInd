# Table: rhh_ImportaPrestamo

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| Empleado | char | YES |
| ConceptoPrestamo | char | YES |
| Aplicacion | char | YES |
| TipoLiquidacion | char | YES |
| FechaInicio | datetime | YES |
| ValorTotal | money | YES |
| ProgramarCuota | tinyint | YES |
| NroCuotas | int | YES |
| ValorCuota | money | YES |
| FechaCuota | datetime | YES |
| IdPrestamo | int | YES |
| PropVacac | bit | NO |
| IdRefinanciar | int | YES |
| usuario | nvarchar | NO |
