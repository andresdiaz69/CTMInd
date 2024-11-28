# View: vw_VehiculosModelos_SinCrear

## Usa los objetos:
- [[ComisionesSpigaVN]]
- [[VehiculosModelos]]

```sql

CREATE VIEW [dbo].[vw_VehiculosModelos_SinCrear]
AS
SELECT        MODELOS_SPIGA.CodigoGama AS CodigoGama_SPIGA, dbo.VehiculosModelos.CodigoGama AS CodigoGama_MLC, MODELOS_SPIGA.Gama, MODELOS_SPIGA.CodigoMArca, MODELOS_SPIGA.Marca, 
                         MODELOS_SPIGA.CodigoModelo, MODELOS_SPIGA.AñoModelo
FROM            dbo.VehiculosModelos RIGHT OUTER JOIN
                             (SELECT DISTINCT CodigoGama, Gama, CodigoMArca, Marca, CodigoModelo, AñoModelo
                               FROM            dbo.ComisionesSpigaVN) AS MODELOS_SPIGA ON dbo.VehiculosModelos.CodigoGama = MODELOS_SPIGA.CodigoGama AND dbo.VehiculosModelos.CodigoMarca = MODELOS_SPIGA.CodigoMArca AND 
                         dbo.VehiculosModelos.CodigoModelo = MODELOS_SPIGA.CodigoModelo AND dbo.VehiculosModelos.AnoModelo = MODELOS_SPIGA.AñoModelo
WHERE        (dbo.VehiculosModelos.CodigoGama IS NULL)



```
