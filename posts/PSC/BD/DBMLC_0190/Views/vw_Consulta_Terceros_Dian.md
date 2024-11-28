# View: vw_Consulta_Terceros_Dian

## Usa los objetos:
- [[vw_Terceros_Registro_Unico]]

```sql
CREATE view vw_Consulta_Terceros_Dian as
select PkTerceros,case when FkDocumentacionTipos =1 then 31
                       when FkDocumentacionTipos =2 then 13
					   else FkDocumentacionTipos end IdTipoDocumento,
	   TipoDocumento=case FkDocumentacionTipos when 1 then 'NIT' 
			                                   when 2 then 'CEDULA'
											   when 3 then 'Tarjeta Extranjería'
											   when 4 then 'Pasaporte'
											   when 5 then 'RUT'
											   when 6 then 'Tarjeta Identidad'
											   when 7 then 'Cédula de Extranjería'end,Nifcif 
  from vw_Terceros_Registro_Unico

```
