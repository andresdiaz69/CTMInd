# View: vw_inventarios

## Usa los objetos:
- [[Vw_Error_Compra_inventario]]
- [[vw_Inventario_RemisionesPendFacturar]]
- [[vw_Inventario_Traslados]]

```sql
CREATE VIEW [dbo].[vw_inventarios] AS
select Ano_Periodo,     Mes_Periodo,      idEmpresas,      NombreEmpresa,        idCentros,
       NombreCentro,    idsecciones,      nombreSeccion,   CodUnidadNegocio,     NombreUnidadNegocio, 
	   idMr  ,          idReferencias,    descripcion ,    ultAñoCompra ,        ultMesCompra ,
	   numReferencias,  Vrcompras,        ValorStock ,     ValorTRaslados ,      ValorRemisiones 
  from (SELECT Ano_Periodo,		  Mes_Periodo,     IdEmpresas,                      NombreEmpresa,     IdCentros,
               NombreCentro,	  idsecciones,     nombreseccion,                   CodUnidadNegocio,  NombreUnidadNegocio, 
        	   idMr,              idReferencias,   descripcion,		                ultAñoCompra,      ultMesCompra,         
        	   numReferencias,    Vrcompras,	   ValorStock = valorPrecioMedio ,  ValorTRaslados=0,  ValorRemisiones=0
          FROM Vw_Error_Compra_inventario  
        
        
         UNION ALL
        
        SELECT Ano_Periodo,         Mes_Periodo,         IdEmpresas_Entrada,   NombreEmpresa,                         IdCentros, 
               NombreCentro,        idsecciones,         nombreseccion,        CodUnidadNegocio,                      NombreUnidadNegocio,
        	   idMr='NA',           idReferencias=null,	 descripcion ='NA',    ultAñoCompra = null,                   ultMesCompra = null,  
        	   numReferencias=0,    Vrcompras=0,  	     ValorStock = 0,       ValorTRaslados = valormediomovimiento, ValorRemisiones=0
          FROM vw_Inventario_Traslados 
         
        
         UNION ALL 
        
        SELECT Ano_Periodo,        Mes_Periodo,         idEmpresas,           Empresa,              idCentros,
               Centro,             idsecciones,         nombreSeccion,        CodUnidadNegocio,     NombreUnidadNegocio, 
        	   idMr='NA',          idReferencias=null,  descripcion ='NA',    ultAñoCompra = null,  ultMesCompra = null,
        	   numReferencias=0,   Vrcompras=0,         ValorStock = 0,       ValorTRaslados = 0,   ValorRemisiones = ValorMedioMovimiento 
          FROM vw_Inventario_RemisionesPendFacturar )a
--where Ano_Periodo=2023
--  and Mes_Periodo =2

```
