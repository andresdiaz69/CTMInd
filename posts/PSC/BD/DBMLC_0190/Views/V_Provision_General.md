# View: V_Provision_General

## Usa los objetos:
- [[Provision_OT_Compania]]
- [[Provision_OT_Datos]]
- [[Provision_OT_Tipo]]

```sql

CREATE VIEW V_Provision_General
AS
SELECT	D.FechaEntrada, D.FechaCalculo, D.DiasAbierto, D.OT, D.IdCentro, D.IdSeccion, D.IdMarca, 
		DescripcionSeccion = UPPER(D.Seccion), D.IdCargo, D.IdSeccionCargo, 
		D.VrCosteRep, D.VrCosteSub, Total = (D.VrCosteRep + D.VrCosteSub), T.Descripcion, C.Compania, C.Calculo,  
		Marca = UPPER(D.Marca), Gama = UPPER(D.Gama), D.Matricula, D.Vin 
FROM	Provision_OT_Datos D, Provision_OT_Tipo T, Provision_OT_Compania C
WHERE	D.IdProvisionTipo = T.IdTipo AND D.IdProvisionCompania = C.IdCompania AND (D.VrCosteRep <> 0 OR D.VrCosteSub <> 0)

```
