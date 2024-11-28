# Stored Procedure: sp_SpigaTerceros

## Usa los objetos:
- [[vw_Terceros_Consolidado]]
- [[vw_Terceros_Consolidado_Direcciones]]

```sql
CREATE  PROCEDURE [dbo].[sp_SpigaTerceros]    
(    
 @NifCif nvarchar(50)    
) AS    
    
BEGIN     
SELECT ISNULL(CAST((ROW_NUMBER() OVER(ORDER BY A.PkTerceros)) AS INT),0) AS Id,  PkTerceros,  NifCif,   
       LTRIM(RTRIM(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(Nombre, '!', ''), '@', 'A'), '$', ''),' ','<>'),'><',''),'<>',' '))) AS Nombre  ,
       Apellido1,     Apellido2,   Email,         Fijo,         Celular,    Direccion,  
	   FkPoblaciones, Poblacion,   TipoDocumento, FkProvincias, Provincia    
  FROM (SELECT A.PkTerceros, A.NifCif,    A.Nombre,        A.Apellido1, A.Apellido2,    Email= email_principal,        Fijo = a.TelPrincipal,     
               Celular = celular1,    Direccion=a.Direccion_Principal, FkPoblaciones=d.fkPoblacionPrincipal, Poblacion=D.fkPoblacionPrincipal, 
			   TipoDocumento=case FkDocumentacionTipos when 1 then 'NIT' 
			                                           when 2 then 'CEDULA'
													   when 3 then 'Tarjeta Extranjería'
													   when 4 then 'Pasaporte'
													   when 5 then 'RUT'
													   when 6 then 'Tarjeta Identidad'
													   when 7 then 'Cédula de Extranjería'end, 
			   FkProvincias=d.FkProvinciaPrincipal, Provincia=d.provinciaPrincipal    
          FROM vw_Terceros_Consolidado        A
		  left join vw_Terceros_Consolidado_Direcciones d on a.PkTerceros = d.PkTerceros
         WHERE A.NifCif = @NifCif    
       ) A    
END    


```
