# View: vw_ComisionesSpigaVOFactura_Pre

## Usa los objetos:
- [[ComisionesSpigaVOFactura]]

```sql


CREATE VIEW [dbo].[vw_ComisionesSpigaVOFactura_Pre]
AS
SELECT        Id, IdComisionSpiga, 

CASE 
WHEN FechaSaldado_Ajustado IS NULL THEN Ano_Periodo
ELSE YEAR(FechaSaldado_Ajustado)
END AS Ano_Periodo,

CASE 
WHEN FechaSaldado_Ajustado IS NULL THEN Mes_Periodo
ELSE MONTH(FechaSaldado_Ajustado)
END AS Mes_Periodo,

Ano_Spiga, Mes_Spiga, CodigoEmpresa, Empresa, CodigoEmpresaSugerido, EmpresaSugerida, CodigoCentro, Centro, FechaFactura, NumeroFactura, Nitcliente, NombreCliente, 
                         CodigoCategoriaCliente, CategoriaCliente, TotalFactura, Matricula, VIN, ImporteEfecto, PkEfectosNumDet_Iden, fksituacionefectos, descripcion, FechaSaldado, CuotaReteFuente, FechaSaldado_Ajustado
FROM            dbo.ComisionesSpigaVOFactura

```
