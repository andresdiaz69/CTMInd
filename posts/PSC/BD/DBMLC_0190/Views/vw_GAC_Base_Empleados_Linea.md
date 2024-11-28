# View: vw_GAC_Base_Empleados_Linea

## Usa los objetos:
- [[EmpleadosActivos]]
- [[Empresas]]
- [[UnidadDeNegocio]]

```sql


CREATE view [dbo].[vw_GAC_Base_Empleados_Linea] as
SELECT DISTINCT d.NombreEmpresa,-- nombre_centro,nombrecentro,
       CASE WHEN c.NombreCentro like '%MIT-Bta-Mayorista%'or nombrecentro='MIT-Bta.San Facón' then 'Mitsubishi Mayorista' 
            WHEN c.NombreCentro like '%BYD-Bta-Mayorista%' then 'BYD Mayorista'
			when c.CodUnidadNegocio = 6 then 'Volkswagen'
            ELSE c.NombreUnidadNegocio END AS NombreUnidadNegocio ,
       b.CodigoEmpleado, 
       b.Ano_Periodo, 
       b.Mes_Periodo, 
       d.CodigoEmpresa, 
       CASE WHEN c.NombreCentro like '%MIT-Bta-Mayorista%' or nombrecentro='MIT-Bta.San Facón' then 21
            WHEN c.NombreCentro like '%BYD-Bta-Mayorista%' then 246
			when c.CodUnidadNegocio = 6 then 2
            ELSE c.CodUnidadNegocio END AS CodUnidadNegocio  --,b.Unidad_Negocio,b.Nombre_Unidad_Negocio,b.codigo_centro,b.nombre_centro,c.CodCentro
  FROM EmpleadosActivos b
  LEFT JOIN UnidadDeNegocio c ON CASE WHEN c.NombreCentro like '%MIT-Bta-Mayorista%' or c.NombreCentro='MIT-Bta.San Facón'  then 21
                                      WHEN c.NombreCentro like '%BYD-Bta-Mayorista%' then 246
                                      ELSE c.CodUnidadNegocio END=  CASE WHEN b.nombre_centro like '%MIT-Bta-Mayorista%' or nombre_centro='MIT-Bta.San Facón' then 21
                                                                         WHEN b.nombre_centro like '%BYD-Bta-Mayorista%' then 246
                                                                         ELSE b.Unidad_Negocio end --or c.NombreUnidadNegocio = b.Nombre_Unidad_Negocio)
                             --and c.CodCentro =b.codigo_centro
  LEFT JOIN Empresas d ON b.CodigoEmpresa=d.CodigoEmpresa
 WHERE b.CodigoMarca IN (0,80,1,2,3,5,6,7,12,13,19,20,22,23,245,410,411,417,418,520)  
   AND b.Nombre_Unidad_Negocio <> 'FOMENTA'
   AND b.Nombre_Unidad_Negocio <> 'PENSIONADOS'
   AND b.Nombre_Unidad_Negocio <> 'REVISORIA' 
   AND b.Nombre_Unidad_Negocio <> 'BONAPARTE'
   AND b.Nombre_Unidad_Negocio <> 'USC (Unidad de Servicios compartidos)'
   AND b.Nombre_Unidad_Negocio not like '%colisi%'
 --and Ano_Periodo = 2023
 --  and Mes_Periodo in (10,11,12)
   --and CodigoEmpleado in('52779347','1015483809')


```
