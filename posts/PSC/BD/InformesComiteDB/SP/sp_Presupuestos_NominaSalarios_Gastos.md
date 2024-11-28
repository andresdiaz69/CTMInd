# Stored Procedure: sp_Presupuestos_NominaSalarios_Gastos

## Usa los objetos:
- [[Presupuestos_Nomina_Salarios_Gastos]]

```sql

CREATE PROCEDURE [dbo].[sp_Presupuestos_NominaSalarios_Gastos]
@CodigoLinea smallint,
@CodigoCentro smallint,
@CodigoDepartamento varchar(10),
@IdClase smallint

AS
BEGIN
DELETE FROM Presupuestos_Nomina_Salarios_Gastos
WHERE Codigo_Linea = @CodigoLinea and Codigo_Centro = @CodigoCentro and Codigo_Departamento = @CodigoDepartamento and IdClase = @IdClase

END

```
