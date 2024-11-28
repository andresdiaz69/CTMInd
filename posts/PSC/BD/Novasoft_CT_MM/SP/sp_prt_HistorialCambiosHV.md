# Stored Procedure: sp_prt_HistorialCambiosHV

## Usa los objetos:
- [[prt_Estados]]
- [[prt_Portal_Historial_DatosBasicos]]
- [[prt_Portal_Historial_DatosFinancieros]]
- [[prt_Portal_Historial_Discapacidades]]
- [[prt_Portal_Historial_Dotacion]]
- [[prt_Portal_Historial_Estudios]]
- [[prt_Portal_Historial_Familia]]
- [[prt_portal_Historial_Idiomas]]
- [[prt_Portal_Historial_RedSocial]]
- [[prt_Portal_Historial_Vivienda]]
- [[prt_SeccionHojaVida]]
- [[prt_tipoCambio]]
- [[rhh_emplea]]

```sql

-- =============================================
-- Author:		<Alexander Vargas>
-- Create date: <16/05/2023>
-- Description:	<Consolida historial de todas las secciones de la HV>
-- =============================================
CREATE PROCEDURE [dbo].[sp_prt_HistorialCambiosHV] @cod_emp CHAR(12)   = '%', 
                                                  @seccion CHAR(3)    = '%', 
										@estado CHAR(3)    = '%', 
                                                  @fecIni  VARCHAR(8) = '20010101', 
                                                  @fecFin  VARCHAR(8) = NULL

--WITH ENCRYPTION

AS
    BEGIN
        -- SET NOCOUNT ON added to prevent extra result sets from
        -- interfering with SELECT statements.
        SET NOCOUNT ON;

        --cuando no hay fecha final asigna la actual
        IF @fecFin IS NULL
            BEGIN
                SET @fecFin = CONVERT(VARCHAR, GETDATE(), 112);
            END;

        --consulta para consolidar historial de todas las secciones de la hoja de vida

        SELECT ROW_NUMBER() OVER(
               ORDER BY Historial.cod_emp) AS consecutivo, 
			historial.cod_emp,
               (RTRIM(emp.nom_emp) + ' ' + RTRIM(emp.ap1_emp) + ' ' + emp.ap2_emp) AS empleado, 
               fec_solicitud, 
			sec.cod_SeccionHV as codigo,
               sec.des_SeccionHV AS seccion, 
			historial.detalle,
			historial.campo,
               IIF(historial.campo='Cuenta Red Social',valor_ant,SUBSTRING(valor_ant,CHARINDEX('_',valor_ant,1)+1,LEN(valor_ant)-CHARINDEX(valor_ant,'_',1))) AS valor_ant, 
			IIF(historial.campo='Cuenta Red Social',valor_nuevo,SUBSTRING(valor_nuevo,CHARINDEX('_',valor_nuevo,1)+1,LEN(valor_nuevo)-CHARINDEX(valor_nuevo,'_',1))) AS valor_nuevo, 
               fec_proceso,
			CONVERT(VARCHAR(2),historial.cod_estado) AS codEstado,
               est.des_estado AS estado, 
               motivo, 
               tipo.nomTipo AS TipoCambio, 
               autorizador
        FROM
        (

            --***** Datos básicos*******
            SELECT his.cod_emp, 
                   fec_solicitud, 
                   cod_seccion,
			    detalle,
			    his.campo as codcampo,
			    EXT.Descripcion as campo,
                   valor_ant, 
                   valor_nuevo, 
                   fec_proceso, 
                   cod_estado, 
                   motivo, 
                   tipo_cambio, 
                   autorizador
            FROM prt_Portal_Historial_DatosBasicos AS his            
		  INNER JOIN 
			(
			--se consultan las propiedades extendidas para usarlas en las descripciones
			--de los campos
			 SELECT c.name AS Campo, value AS Descripcion
			 FROM sys.extended_properties AS ep
			 INNER JOIN sys.tables AS t ON ep.major_id = t.object_id 
			 INNER JOIN sys.columns AS c ON ep.major_id = c.object_id AND ep.minor_id = c.column_id
			 WHERE class = 1  and t.name IN ('rhh_emplea') 

			) AS EXT ON his.campo=EXT.Campo 
		  WHERE cod_emp LIKE RTRIM(@cod_emp) 
            UNION ALL

            --*****Datos financieros*******
            SELECT cod_emp, 
                   fec_solicitud, 
                   cod_seccion,
			    detalle,
			    his.campo as codcampo,
			    EXT.Descripcion as campo,
                   valor_ant, 
                   valor_nuevo, 
                   fec_proceso, 
                   cod_estado, 
                   motivo, 
                   tipo_cambio, 
                   autorizador
            FROM prt_Portal_Historial_DatosFinancieros AS his 
		  INNER JOIN 
			(
			--se consultan las propiedades extendidas para usarlas en las descripciones
			--de los campos
			 SELECT c.name AS Campo, value AS Descripcion
			 FROM sys.extended_properties AS ep
			 INNER JOIN sys.tables AS t ON ep.major_id = t.object_id 
			 INNER JOIN sys.columns AS c ON ep.major_id = c.object_id AND ep.minor_id = c.column_id
			 WHERE class = 1  and t.name IN ('rhh_emplea') 

			) AS EXT ON his.campo=EXT.Campo 
            WHERE cod_emp LIKE RTRIM(@cod_emp) 

            UNION ALL

            --*****Vivienda*******
            SELECT cod_emp, 
                   fec_solicitud, 
                   cod_seccion,
			    detalle,
			    his.campo as codcampo,
			    EXT.Descripcion as campo,
                   valor_ant, 
                   valor_nuevo, 
                   fec_proceso, 
                   cod_estado, 
                   motivo, 
                   tipo_cambio, 
                   autorizador
            FROM prt_Portal_Historial_Vivienda AS his 
		  INNER JOIN 
		(
			SELECT c.name AS Campo, value AS Descripcion
			FROM sys.extended_properties AS ep
			INNER JOIN sys.tables AS t ON ep.major_id = t.object_id 
			INNER JOIN sys.columns AS c ON ep.major_id = c.object_id AND ep.minor_id = c.column_id
			WHERE class = 1 and t.name='rhh_vivienda'
		) AS EXT ON his.campo=EXT.Campo
            WHERE cod_emp LIKE RTRIM(@cod_emp)
            UNION ALL 

            --*****Discapacidades*******
            SELECT cod_emp, 
                   fec_solicitud, 
                   cod_seccion,
			    detalle,
			    his.campo as codcampo,
			    EXT.Descripcion as campo,
                   valor_ant, 
                   valor_nuevo, 
                   fec_proceso, 
                   cod_estado, 
                   motivo, 
                   tipo_cambio, 
                   autorizador
            FROM prt_Portal_Historial_Discapacidades AS his 
		  INNER JOIN 
		(
			SELECT c.name AS Campo, value AS Descripcion
			FROM sys.extended_properties AS ep
			INNER JOIN sys.tables AS t ON ep.major_id = t.object_id 
			INNER JOIN sys.columns AS c ON ep.major_id = c.object_id AND ep.minor_id = c.column_id
			WHERE class = 1 and t.name='GTH_DiscapEmplea'
		) AS EXT ON his.campo=EXT.Campo 
            WHERE cod_emp LIKE RTRIM(@cod_emp)
            UNION ALL

            --*****Estudios*******
            SELECT cod_emp, 
                   fec_solicitud, 
                   cod_seccion,
			    detalle,
			    his.campo as codcampo,
			    EXT.Descripcion as campo,
                   valor_ant, 
                   valor_nuevo, 
                   fec_proceso, 
                   cod_estado, 
                   motivo, 
                   tipo_cambio, 
                   autorizador
            FROM prt_Portal_Historial_Estudios AS his 
		      INNER JOIN
                (
                    SELECT c.name AS Campo, 
                           value AS Descripcion
                    FROM sys.extended_properties AS ep
                         INNER JOIN sys.tables AS t ON ep.major_id = t.object_id
                         INNER JOIN sys.columns AS c ON ep.major_id = c.object_id
                                                        AND ep.minor_id = c.column_id
                    WHERE class = 1
                          AND t.name = 'rhh_estudio'
                ) AS EXT ON his.campo=EXT.Campo 
            WHERE cod_emp LIKE RTRIM(@cod_emp)
            UNION ALL

            --*****Familiares*******
            SELECT cod_emp, 
                   fec_solicitud, 
                   cod_seccion,
			    detalle,
			    his.campo as codcampo,
			    EXT.Descripcion as campo,
                   valor_ant, 
                   valor_nuevo, 
                   fec_proceso, 
                   cod_estado, 
                   motivo, 
                   tipo_cambio, 
                   autorizador
            FROM prt_Portal_Historial_Familia AS his 
		  INNER JOIN 
		  (
		  SELECT c.name AS Campo, value AS Descripcion
		  FROM sys.extended_properties AS ep
		  INNER JOIN sys.tables AS t ON ep.major_id = t.object_id 
		  INNER JOIN sys.columns AS c ON ep.major_id = c.object_id AND ep.minor_id = c.column_id
		  WHERE class = 1 and t.name='rhh_familia'
		  ) AS EXT ON his.campo=EXT.Campo 		  
            WHERE cod_emp LIKE RTRIM(@cod_emp)
            UNION ALL

            --*****Redes sociales*******
            SELECT cod_emp, 
                   fec_solicitud, 
                   cod_seccion,
			    detalle,
			    his.campo as codcampo,
			    EXT.Descripcion as campo,
                   valor_ant, 
                   valor_nuevo, 
                   fec_proceso, 
                   cod_estado, 
                   motivo, 
                   tipo_cambio, 
                   autorizador
            FROM prt_Portal_Historial_RedSocial AS his 
		  INNER JOIN 
		  (
			  SELECT c.name AS Campo, value AS Descripcion
			  FROM sys.extended_properties AS ep
			  INNER JOIN sys.tables AS t ON ep.major_id = t.object_id 
			  INNER JOIN sys.columns AS c ON ep.major_id = c.object_id AND ep.minor_id = c.column_id
			  WHERE class = 1 and t.name='GTH_EmpRedSocial'
		  ) AS EXT ON his.campo=EXT.Campo 	
            WHERE cod_emp LIKE RTRIM(@cod_emp)
            UNION ALL

            --*****Idiomas*******
            SELECT cod_emp, 
                   fec_solicitud, 
                   cod_seccion,
			    detalle,
			    his.campo as codcampo,
			    EXT.Descripcion as campo,
                   valor_ant, 
                   valor_nuevo, 
                   fec_proceso, 
                   cod_estado, 
                   motivo, 
                   tipo_cambio, 
                   autorizador
            FROM prt_portal_Historial_Idiomas AS his 
		  INNER JOIN 
		  (
			  SELECT c.name AS Campo, value AS Descripcion
			  FROM sys.extended_properties AS ep
			  INNER JOIN sys.tables AS t ON ep.major_id = t.object_id 
			  INNER JOIN sys.columns AS c ON ep.major_id = c.object_id AND ep.minor_id = c.column_id
			  WHERE class = 1 and t.name='rhh_idioma'
		  ) AS EXT ON his.campo=EXT.Campo 	
            WHERE cod_emp LIKE RTRIM(@cod_emp)
            UNION ALL

            --*****Dotación*******
            SELECT cod_emp, 
                   fec_solicitud, 
                   cod_seccion,
			    detalle,
			    his.campo as codcampo,
			    EXT.Descripcion as campo,
                   valor_ant, 
                   valor_nuevo, 
                   fec_proceso, 
                   cod_estado, 
                   motivo, 
                   tipo_cambio, 
                   autorizador
            FROM prt_Portal_Historial_Dotacion AS his 
		  INNER JOIN 
		  (
			  SELECT c.name AS Campo, value AS Descripcion
			  FROM sys.extended_properties AS ep
			  INNER JOIN sys.tables AS t ON ep.major_id = t.object_id 
			  INNER JOIN sys.columns AS c ON ep.major_id = c.object_id AND ep.minor_id = c.column_id
			  WHERE class = 1 and t.name='GTH_DotaTallaEmplea'
		  ) EXT ON his.campo=EXT.Campo 	
            WHERE cod_emp LIKE RTRIM(@cod_emp)
        ) AS Historial

        --Descripciones de algunos campos
        INNER JOIN prt_SeccionHojaVida AS sec ON sec.cod_SeccionHV = Historial.cod_seccion
        INNER JOIN prt_Estados AS est ON est.cod_Estado = Historial.cod_estado
        INNER JOIN prt_tipoCambio AS tipo ON tipo.codTipo = Historial.tipo_cambio
        INNER JOIN rhh_emplea AS emp ON emp.cod_emp = Historial.cod_emp
        WHERE Historial.cod_seccion LIKE RTRIM(@seccion) 
		    AND Historial.cod_estado LIKE RTRIM(@estado) 
              AND CONVERT(VARCHAR, fec_solicitud, 112) >= @fecIni
              AND CONVERT(VARCHAR, fec_solicitud, 112) <= @fecFin;
    END;

```
