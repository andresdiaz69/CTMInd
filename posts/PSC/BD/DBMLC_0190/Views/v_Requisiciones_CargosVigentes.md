# View: v_Requisiciones_CargosVigentes

## Usa los objetos:
- [[Cargos]]

```sql

CREATE VIEW [dbo].[v_Requisiciones_CargosVigentes] AS
SELECT CodigoCargo, NombreCargo = REPLACE(REPLACE(REPLACE(NombreCargo,' ','<>'),'><',''),'<>',' '), Activo, Obsoleto, AplicaBonificacionTaller,
	CodigoConceptoBonificacionTaller, AplicaBolsaRepuestos, AplicaBolsaEspecialistas, AplicaBolsaEspecialistasColision, sal_bas, niv_car, ValorMaximoBonificacion
FROM Cargos
WHERE Activo = 1 AND Obsoleto = 0 AND NombreCargo NOT LIKE '%(NA)%'

```
