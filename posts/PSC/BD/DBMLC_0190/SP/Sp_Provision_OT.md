# Stored Procedure: Sp_Provision_OT

## Usa los objetos:
- [[Provision_OT_Resultado]]
- [[Sp_Provision_AgregarAResultadoFormula]]
- [[Sp_Provision_AgregarAResultadoPorcentaje]]
- [[Sp_Provision_QuitarAcumulado]]

```sql

CREATE PROCEDURE Sp_Provision_OT

@FECHA DATETIME,
@empresa int

AS
BEGIN
	SET NOCOUNT ON
	SET FMTONLY OFF

	--TRUNCATE TABLE Provision_OT_Datos
	--EXEC Sp_Provision_AgregarADatos @FECHA
	TRUNCATE TABLE Provision_OT_Resultado
	EXEC Sp_Provision_AgregarAResultadoFormula @FECHA, @empresa
	EXEC Sp_Provision_AgregarAResultadoPorcentaje @FECHA
	EXEC Sp_Provision_QuitarAcumulado @FECHA, @empresa

	RETURN 1
END
```
