# Stored Procedure: sp_Presupuestos_NominaSalarios

## Usa los objetos:
- [[Presupuestos_Nomina_Salarios]]

```sql


CREATE PROCEDURE [dbo].[sp_Presupuestos_NominaSalarios]
@CodigoLinea smallint,
@CodigoCentro smallint,
@CodigoDepartamento varchar(10),
@IdClase smallint

AS
BEGIN
DELETE FROM Presupuestos_Nomina_Salarios
WHERE Codigo_Linea = @CodigoLinea and Codigo_Centro = @CodigoCentro and Codigo_Departamento = Codigo_Departamento and IdClase = @IdClase

END

```
