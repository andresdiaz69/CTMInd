# View: vw_VehiculosVIN_SinCrear

## Usa los objetos:
- [[ComisionesSpigaVN]]
- [[ComisionesSpigaVNFactura]]
- [[ComisionesSpigaVO]]
- [[ComisionesSpigaVOFactura]]
- [[VehiculosVIN]]

```sql




CREATE VIEW [dbo].[vw_VehiculosVIN_SinCrear]
AS
SELECT  

isnull(ROW_NUMBER() OVER (ORDER BY VIN_SPIGA), 0) AS Row,


      VIN_SPIGA, VIN_MLC, ComisionRecaudoBloqueada, ComisionProductividadBloqueada, UserIdBloqueo, FechaBloqueo
FROM            (SELECT DISTINCT 
                                                    VINES.VIN AS VIN_SPIGA, dbo.VehiculosVIN.VIN AS VIN_MLC, dbo.VehiculosVIN.ComisionRecaudoBloqueada, dbo.VehiculosVIN.ComisionProductividadBloqueada,
                                                    dbo.VehiculosVIN.UserIdBloqueo, dbo.VehiculosVIN.FechaBloqueo
                          FROM            (
						  
						  
						  
						  SELECT VIN FROM dbo.ComisionesSpigaVNFactura WHERE VIN IS NOT NULL AND VIN <> ''
                                                    UNION ALL
							SELECT VIN FROM dbo.ComisionesSpigaVN WHERE VIN IS NOT NULL AND VIN <> ''
											UNION ALL
							SELECT VIN FROM dbo.ComisionesSpigaVOFactura WHERE VIN IS NOT NULL AND VIN <> ''
                                                    UNION ALL
							SELECT VIN FROM dbo.ComisionesSpigaVO WHERE VIN IS NOT NULL AND VIN <> ''	
													
													
													
													) AS VINES LEFT OUTER JOIN
                                                    dbo.VehiculosVIN ON VINES.VIN = dbo.VehiculosVIN.VIN
                          WHERE        (dbo.VehiculosVIN.VIN IS NULL)) AS RESULTADO





```
